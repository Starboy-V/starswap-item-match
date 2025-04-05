
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Star, LogIn, User, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
      }
    };
    checkSession();
  }, [navigate]);

  // 3D hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Form validation
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter your password",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (!isLogin && !name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Password strength check for signup
    if (!isLogin && password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      if (isLogin) {
        // Authentication with Supabase for login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: "Welcome back",
          description: "You have successfully logged in",
        });
        
        navigate("/");
      } else {
        // Authentication with Supabase for registration
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });

        if (error) throw error;
        
        toast({
          title: "Account created",
          description: "Welcome to StarSwap X!",
        });
        
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: isLogin ? "Login Failed" : "Registration Failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background animation stars - handled by StarfieldBackground component */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="flex justify-center mb-2"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star className="text-primary text-glow" fill="currentColor" size={48} />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">StarSwap X</h1>
          <p className="text-muted-foreground mt-1">The Cosmic Item Exchange</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetRotation}
          className="cosmic-panel rounded-lg shadow-xl p-6 transition-all"
        >
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(true)}
              className="w-1/2 relative overflow-hidden group cosmic-btn"
              disabled={isLoading}
            >
              <span className="relative z-10">Log In</span>
              {isLogin && (
                <motion.span
                  className="absolute inset-0 bg-primary"
                  layoutId="tabHighlight"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Button>
            <Button
              variant={!isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(false)}
              className="w-1/2 relative overflow-hidden group cosmic-btn"
              disabled={isLoading}
            >
              <span className="relative z-10">Sign Up</span>
              {!isLogin && (
                <motion.span
                  className="absolute inset-0 bg-primary"
                  layoutId="tabHighlight"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                  key="name-field"
                >
                  <Label htmlFor="name" className="text-glow">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="pl-10 cosmic-input"
                      autoComplete="name"
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-glow">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="pl-10 cosmic-input"
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-glow">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="pl-10 pr-10 cosmic-input"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline text-glow">
                  Forgot password?
                </Link>
              </div>
            )}

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 group cosmic-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                ) : (
                  <LogIn className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
                {isLogin ? "Log In" : "Sign Up"}
              </Button>
            </motion.div>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium text-glow"
              disabled={isLoading}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
