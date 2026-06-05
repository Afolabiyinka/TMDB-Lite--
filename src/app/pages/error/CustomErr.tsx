import { AlertTriangle, Home, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";

const CustomError = ({ message }: { message?: string }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 text-center space-y-6"
            >
                <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-destructive/10 text-destructive">
                        <AlertTriangle />
                    </div>
                </div>

                <div>
                    <h1 className="text-xl font-semibold">
                        Something went wrong
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        We couldn’t complete your request.
                    </p>
                </div>

                {message && (
                    <div className="text-xs text-muted-foreground bg-muted/50 border rounded-lg p-3 wrap-break-word">
                        {message}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-3  items-center justify-center">
                    <Button onClick={() => window.location.reload()} size={`lg`}>
                        <Loader2 />
                        Try again
                    </Button>

                    <Button
                        size={`lg`}
                        variant="outline"
                        onClick={() => navigate("/dashboard")}
                    >
                        <Home />
                        Go home
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default CustomError;