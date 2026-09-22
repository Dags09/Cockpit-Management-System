import User from "../models/user.model.js";
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const debugSeedAdmin = async () => {
    try {
        console.log("🚀 Starting admin seeder...");
        console.log("📡 Environment loaded:", process.env.NODE_ENV);

        console.log("🔌 Connecting to database...");
        await connectDB();
        console.log("✅ Database connected!");

        console.log("🔍 Checking for existing admin users...");
        const existingAdmins = await User.find({ role: "admin" });
        console.log(`📊 Found ${existingAdmins.length} admin user(s)`);

        if (existingAdmins.length > 0) {
            console.log("📋 Existing admin(s):");
            existingAdmins.forEach((admin, index) => {
                console.log(
                    `   ${index + 1}. Username: ${admin.username}, Email: ${admin.email}`,
                );
            });
            console.log("⚠️  Admin already exists. Skipping creation.");
            return;
        }

        console.log("📝 Creating new admin user...");

        const adminData = {
            username: "admin",
            email: "sabongnation00@gmail.com",
            password: "Password2025@@",
            firstName: "System",
            lastName: "Administrator",
            role: "admin",
            isActive: true,
            passwordChanged: true,
            passwordChangedAt: new Date(),
            emailVerified: true,
        };

        console.log("💾 Saving admin to database...");
        const admin = new User(adminData);
        await admin.save();

        console.log("✅ Admin user created successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📋 Admin Account Details:");
        console.log("   Username: admin");
        console.log("   Password: Password2025@@");
        console.log("   Email: sabongnation00@gmail.com");
        console.log("   Role: admin");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    } catch (error) {
        console.error("❌ Error in admin seeder:", error.message);
        console.error("Stack trace:", error.stack);
    } finally {
        console.log("🏁 Seeder completed.");
        process.exit(0);
    }
};

debugSeedAdmin();
