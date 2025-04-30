import mongoose from "mongoose";

const connectDB = async () => {
	try {
		if (!process.env.MONGO_URL) {
			throw new Error("MONGO_URL is not defined in environment variables");
		}

		const options = {
			serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 10s
			socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
			family: 4, // Use IPv4, skip trying IPv6
		};

		await mongoose.connect(process.env.MONGO_URL, options);
		console.log("Mongodb is connected!");
	} catch (err) {
		console.error("MONGODB CONNECTION ERROR:", err);
		process.exit(1); // Exit process with failure
	}
};

export default connectDB;
