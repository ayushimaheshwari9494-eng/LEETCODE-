const redisClient = require("../config/redis");

const submitLimiter = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const key = `submit:${userId}`;

        const count = await redisClient.get(key);

        if (!count) {
            await redisClient.set(key, 1, {
                EX: 60
            });

            return next();
        }

        if (Number(count) >= 10) {
            return res.status(429).json({
                success: false,
                message: "Too many submissions. Try again after 1 minute."
            });
        }

        await redisClient.incr(key);

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send("Rate limiter error");
    }
};

module.exports = submitLimiter;