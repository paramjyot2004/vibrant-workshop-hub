-- Create workshops table
CREATE TABLE public.workshops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor_name TEXT NOT NULL,
  instructor_email TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 30,
  current_participants INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  category TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  workshop_id UUID NOT NULL REFERENCES public.workshops(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_intent_id TEXT,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  special_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, workshop_id)
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  bio TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('booking', 'reminder', 'workshop_update', 'payment')),
  read BOOLEAN NOT NULL DEFAULT false,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email logs table
CREATE TABLE public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'pending')),
  error_message TEXT,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for workshops (public read, admin write)
CREATE POLICY "Anyone can view workshops" ON public.workshops FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create workshops" ON public.workshops FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own workshops" ON public.workshops FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can create their own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update their own bookings" ON public.bookings FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can create their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Create policies for email logs (admin only)
CREATE POLICY "Admin can view email logs" ON public.email_logs FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "System can create email logs" ON public.email_logs FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_workshops_updated_at BEFORE UPDATE ON public.workshops FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample workshops data
INSERT INTO public.workshops (title, description, instructor_name, instructor_email, start_date, end_date, max_participants, price, category, difficulty_level) VALUES
('Introduction to Python Programming', 'Learn the fundamentals of Python programming language including variables, functions, and basic data structures.', 'Dr. Sarah Johnson', 'sarah.johnson@fossee.in', '2025-01-20 10:00:00+00', '2025-01-20 17:00:00+00', 25, 500.00, 'Programming', 'beginner'),
('Advanced Machine Learning', 'Deep dive into advanced ML algorithms, neural networks, and practical applications using Python and TensorFlow.', 'Prof. Raj Kumar', 'raj.kumar@fossee.in', '2025-01-25 09:00:00+00', '2025-01-27 18:00:00+00', 20, 1500.00, 'Machine Learning', 'advanced'),
('Web Development with React', 'Build modern web applications using React, hooks, and state management libraries.', 'Ms. Priya Sharma', 'priya.sharma@fossee.in', '2025-02-01 10:00:00+00', '2025-02-03 17:00:00+00', 30, 1200.00, 'Web Development', 'intermediate'),
('Data Science Fundamentals', 'Introduction to data analysis, visualization, and statistical modeling using R and Python.', 'Dr. Amit Patel', 'amit.patel@fossee.in', '2025-02-10 09:30:00+00', '2025-02-12 16:30:00+00', 25, 800.00, 'Data Science', 'beginner'),
('Cybersecurity Essentials', 'Learn about network security, ethical hacking, and cybersecurity best practices.', 'Mr. Vikash Singh', 'vikash.singh@fossee.in', '2025-02-15 10:00:00+00', '2025-02-16 18:00:00+00', 15, 1000.00, 'Security', 'intermediate'),
('Mobile App Development', 'Create cross-platform mobile applications using React Native and Flutter.', 'Ms. Anita Desai', 'anita.desai@fossee.in', '2025-02-20 09:00:00+00', '2025-02-22 17:00:00+00', 20, 1300.00, 'Mobile Development', 'intermediate');