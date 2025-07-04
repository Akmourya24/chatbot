import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// ROUTES
import userRouter from './routes/user.routes.js';
app.use("/api/v1/user", userRouter);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is working");
});

// GLOBAL ERROR HANDLER (Important!)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export { app };
