const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Debug database connection
console.log('🔍 Environment check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL preview:', process.env.DATABASE_URL ?
    process.env.DATABASE_URL.replace(/:[^:@]*@/, ':***@') : 'NOT SET');

// PostgreSQL connection - Railway provides DATABASE_URL automatically
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('✅ Database connection test successful');
        client.release();
    } catch (error) {
        console.error('❌ Database connection test failed:', error.message);
        throw error;
    }
}

// Initialize database tables on startup
async function initDatabase() {
    try {
        // Test connection first
        await testConnection();

        // Create likes table to track individual likes
        await pool.query(`
            CREATE TABLE IF NOT EXISTS likes (
                                                 id SERIAL PRIMARY KEY,
                                                 item_id VARCHAR(255) NOT NULL,
                page_type VARCHAR(255) NOT NULL,
                visitor_id VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(item_id, page_type, visitor_id)
                )
        `);

        // Create indexes for better performance
        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_likes_item_page
                ON likes(item_id, page_type)
        `);

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_likes_visitor
                ON likes(visitor_id)
        `);

        console.log('✅ Database tables initialized successfully');
    } catch (error) {
        console.error('❌ Database initialization error:', error);
        process.exit(1);
    }
}

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Like/Unlike endpoint
app.post('/api/like', async (req, res) => {
    const { itemId, pageType, visitorId } = req.body;

    if (!itemId || !pageType || !visitorId) {
        return res.status(400).json({ error: 'Missing required fields: itemId, pageType, visitorId' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Check if user already liked this item
        const existingLike = await client.query(
            'SELECT id FROM likes WHERE item_id = $1 AND page_type = $2 AND visitor_id = $3',
            [itemId, pageType, visitorId]
        );

        const alreadyLiked = existingLike.rows.length > 0;

        if (alreadyLiked) {
            // Unlike: Remove the like
            await client.query(
                'DELETE FROM likes WHERE item_id = $1 AND page_type = $2 AND visitor_id = $3',
                [itemId, pageType, visitorId]
            );
        } else {
            // Like: Add the like
            await client.query(
                'INSERT INTO likes (item_id, page_type, visitor_id) VALUES ($1, $2, $3)',
                [itemId, pageType, visitorId]
            );
        }

        // Get the new total count for this item
        const countResult = await client.query(
            'SELECT COUNT(*) as count FROM likes WHERE item_id = $1 AND page_type = $2',
            [itemId, pageType]
        );

        const newLikeCount = parseInt(countResult.rows[0].count);

        await client.query('COMMIT');

        // Return response json
        res.json({
            success: true,
            liked: !alreadyLiked,
            newLikeCount,
            action: alreadyLiked ? 'unliked' : 'liked'
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error processing like:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        client.release();
    }
});

// Check like status endpoint
app.get('/api/check-like/:pageType/:itemId/:visitorId', async (req, res) => {
    const { pageType, itemId, visitorId } = req.params;

    try {
        const result = await pool.query(
            'SELECT id FROM likes WHERE item_id = $1 AND page_type = $2 AND visitor_id = $3',
            [itemId, pageType, visitorId]
        );

        const hasLiked = result.rows.length > 0;
        res.json({ hasLiked });
    } catch (error) {
        console.error('Error checking like status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all like counts for a page type (for initial load)
app.get('/api/likes/:pageType', async (req, res) => {
    const { pageType } = req.params;

    try {
        const result = await pool.query(`
            SELECT item_id, COUNT(*) as count
            FROM likes
            WHERE page_type = $1
            GROUP BY item_id
        `, [pageType]);

        // Convert to object format for easy frontend consumption
        const likeCounts = {};
        result.rows.forEach(row => {
            likeCounts[row.item_id] = parseInt(row.count);
        });

        res.json(likeCounts);
    } catch (error) {
        console.error('Error getting like counts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get like statistics
app.get('/api/stats/:pageType', async (req, res) => {
    const { pageType } = req.params;

    try {
        const result = await pool.query(`
            SELECT
                COUNT(DISTINCT visitor_id) as unique_visitors,
                COUNT(*) as total_likes,
                COUNT(DISTINCT item_id) as liked_items
            FROM likes
            WHERE page_type = $1
        `, [pageType]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Initialize database and start server
async function startServer() {
    await initDatabase();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Database connected successfully`);
    });
}

startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await pool.end();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    await pool.end();
    process.exit(0);
});