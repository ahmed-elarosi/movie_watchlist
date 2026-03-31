import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;

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
                userId: req.user.id,
                movieId: movieId,
            },
        },
    });

    if (existingInWatchlist) {
        return res.status(400).json({ error: "Movie Already In The  Watchlist" });
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId: req.user.id,
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

const updateWatchlistItem = async (req, res) => {
    const { status, rating, notes } = req.body;

    // find the watchlist item and check ownership
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id },
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }

    if (watchlistItem.userId !== req.user.id) {
        return res.status(403).json({ error: "Not allowed to update this watchlist item" });
    }

    //build update date
    const updateData = {};
};

const removeFromWatchlist = async (req, res) => {
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id },
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }

    // ensure only owner can delete
    if (watchlistItem.userId !== req.user.id) {
        return res.status(403).json({ error: "Not allowed to update this watchlist item" });
    }

    await prisma.watchlistItem.delete({
        where: { id: req.params.id },
    });

    res.status(200).json({
        status: "success",
        message: "Movie removed from watchlist",
    });
};

export { addToWatchlist, removeFromWatchlist };
