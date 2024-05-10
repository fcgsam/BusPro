import { Router } from 'express';
import Ticket from '../models/Tickets.mjs';
import moment from 'moment';
import cors from 'cors';
import bodyParser from 'body-parser';
const router = Router();

router.use(bodyParser.json());
router.use(cors());

// Helper function to calculate start and end dates of a month
const getMonthDates = (date) => {
    const [year, month] = date.split('-');
    const startDate = moment(`${year}-${month}-01`).startOf('month').toDate();
    const endDate = moment(`${year}-${month}-01`).endOf('month').toDate();
    return { startDate, endDate };
};

// Endpoint to get total revenue for a specific month and year
router.post('/totalrevenue', async (req, res) => {
    try {
        const { date } = req.body;
        const { startDate, endDate } = getMonthDates(date);

        // Query for tickets sold within the specified month and year
        const tickets = await Ticket.find({
            journeyDate: {
                $gte: startDate,
                $lte: endDate
            },
            status: 'COMPLETED' // Assuming revenue is only generated for completed trips
        });

        // Calculate total revenue
        const totalRevenue = tickets.reduce((total, ticket) => total + ticket.amount, 0);
        res.status(200).json({ totalRevenue });
    } catch (error) {
        console.error("Error fetching total revenue:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to get top routes for a specific month and year
router.post('/toproutes', async (req, res) => {
    try {
        const { date } = req.body;
        const { startDate, endDate } = getMonthDates(date);

        // Aggregate pipeline to join tickets with buses and group by origin and destination
        const mostBookedRoute = await Ticket.aggregate([
            {
                $lookup: {
                    from: "buses", // Collection name of the Bus model
                    localField: "bus",
                    foreignField: "_id",
                    as: "bus"
                }
            },
            {
                $unwind: "$bus"
            },
            {
                $match: {
                    $and: [
                        { journeyDate: { $gte: startDate, $lte: endDate } },
                        { status: 'COMPLETED' } // Assuming revenue is only generated for completed trips
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        origin: "$bus.from",
                        destination: "$bus.to"
                    }, // Group by origin and destination
                    count: { $sum: 1 } // Count the number of tickets
                }
            },
            {
                $sort: { count: -1 } // Sort by count in descending order
            },
            {
                $limit: 1 // Limit to the top route
            }
        ]);

        if (mostBookedRoute.length > 0) {
            const { origin, destination } = mostBookedRoute[0]._id;
            res.status(200).json({ origin, destination });
        } else {
            res.status(200).json({ message: "No data found" });
        }
    } catch (error) {
        console.error("Error fetching most booked route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to get passenger count for a specific month and year
router.post('/passengercount', async (req, res) => {
    try {
        const { date } = req.body;
        const { startDate, endDate } = getMonthDates(date);

        // Aggregate pipeline to count passengers
        const passengerCount = await Ticket.aggregate([
            {
                $match: {
                    journeyDate: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $unwind: "$Passengers"
            },
            {
                $group: {
                    _id: null,
                    totalPassengers: { $sum: 1 }
                }
            }
        ]);

        // If no data found, return 0 passengers
        const totalPassengers = passengerCount.length > 0 ? passengerCount[0].totalPassengers : 0;

        res.status(200).json({ totalPassengers });
    } catch (error) {
        console.error("Error fetching passenger count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to calculate average revenue per booking for a specific month and year
router.post('/avgrevenue', async (req, res) => {
    try {
        const { date } = req.body;
        const { startDate, endDate } = getMonthDates(date);

        // Calculate the total revenue
        const totalRevenue = await Ticket.aggregate([
            {
                $match: {
                    journeyDate: {
                        $gte: startDate,
                        $lte: endDate
                    },
                    status: 'COMPLETED' // Considering only completed tickets
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amount" }
                }
            }
        ]);

        // Calculate the total number of completed bookings
        const totalBookings = await Ticket.countDocuments({
            journeyDate: {
                $gte: startDate,
                $lte: endDate
            },
            status: 'COMPLETED' // Considering only completed tickets
        });

        // Calculate the average revenue per booking
        const avgRevenue = totalRevenue.length > 0 ? totalRevenue[0].totalRevenue / totalBookings : 0;

        res.status(200).json({ avgRevenue });
    } catch (error) {
        console.error("Error calculating average revenue per booking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to compare sales performance between different routes for a specific month and year
router.post('/salescomparison', async (req, res) => {
    try {
        const { date } = req.body;
        const { startDate, endDate } = getMonthDates(date);

        const salesComparison = await Ticket.aggregate([
            {
                $match: {
                    journeyDate: {
                        $gte: startDate,
                        $lte: endDate
                    },
                    status: 'COMPLETED' // Considering only completed tickets
                }
            },
            {
                $lookup: {
                    from: "buses",
                    localField: "bus",
                    foreignField: "_id",
                    as: "bus"
                }
            },
            {
                $unwind: "$bus"
            },
            {
                $group: {
                    _id: "$bus.from",
                    totalRevenue: { $sum: "$amount" }
                }
            }
        ]);
        console.log(`214  ${salesComparison}`)
        salesComparison?
        res.status(200).json({ salesComparison }):res.status(200).json({ message: "No data found" });
    } catch (error) {
        console.error("Error comparing sales performance between different routes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to find most frequent passenger age groups for a specific month and year
router.post('/frequentagegroups', async (req, res) => {
    try {
        const { date } = req.body;
        const { startDate, endDate } = getMonthDates(date);

        const ageGroups = await Ticket.aggregate([
            {
                $match: {
                    journeyDate: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            { $unwind: "$Passengers" },
            {
                $group: {
                    _id: "$Passengers.age",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 } // Get top 5 frequent age groups
        ]);

        res.status(200).json({ ageGroups });
    } catch (error) {
        console.error("Error finding most frequent passenger age groups:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to get route popularity ranking
router.post('/popularroutes', async (req, res) => {
    try {
        const { date } = req.body;
        const [year, month] = date.split('-');

        // Calculate start and end dates for the specified month and year
        const startDate = moment(`${year}-${month}-01`).startOf('month').toDate();
        const endDate = moment(`${year}-${month}-01`).endOf('month').toDate();

        const routePopularity = await Ticket.aggregate([
            {
                $match: {
                    journeyDate: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: "$bus",
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "buses",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bus"
                }
            },
            { $unwind: "$bus" },
            {
                $project: {
                    from: "$bus.from",
                    to: "$bus.to",
                    count: 1
                }
            },
            { $sort: { count: -1 } } // Sort routes by booking count
        ]);
        console.log(`298  : ${routePopularity}`)
        res.status(200).json({ routePopularity });
    } catch (error) {
        console.error("Error getting route popularity ranking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
