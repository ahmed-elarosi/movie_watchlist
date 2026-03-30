import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
    const { movieId, status, rating, notes, userId } = req.body;

    // verify movie exists
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
    });

    if (!movie) {
        return res.status(404).json({ error: "Movie Not Found" });
    }

    // check if movie already added
    const existingInWatchlist = await prisma.watchlistItem.findUnique({
        where: {
            userId_movieId: {
                userId: userId,
                movieId: movieId,
            },
        },
    });

    if (!existingInWatchlist) {
        return res.status(400).json({ error: "Movie Already In The  Watchlist" });
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId,
            movieId,
            status: status || "PLANNED",
            rating,
            notes,
        },
    });
    res.status(201).json({
        status: "Success",
        data: {
            watchlistItem,
        },
    });
};

export { addToWatchlist };
