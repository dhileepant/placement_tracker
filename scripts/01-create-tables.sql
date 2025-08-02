-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'student')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create student profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  student_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  cgpa DECIMAL(3,2),
  phone VARCHAR(20),
  github_username VARCHAR(100),
  leetcode_username VARCHAR(100),
  codeforces_username VARCHAR(100),
  codechef_username VARCHAR(100), -- Added codechef_username field
  linkedin_url TEXT,
  resume_url TEXT,
  skills TEXT[],
  placement_status VARCHAR(20) DEFAULT 'not_placed' CHECK (placement_status IN ('placed', 'in_process', 'not_placed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  total_marks INTEGER NOT NULL,
  duration_minutes INTEGER,
  assessment_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create student assessments table
CREATE TABLE IF NOT EXISTS student_assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  rank INTEGER,
  feedback TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create placements table
CREATE TABLE IF NOT EXISTS placements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  package_lpa DECIMAL(10,2),
  offer_date DATE,
  status VARCHAR(20) DEFAULT 'offered' CHECK (status IN ('offered', 'accepted', 'rejected')),
  interview_stages TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coding stats table for tracking external platform progress
CREATE TABLE IF NOT EXISTS coding_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  problems_solved INTEGER DEFAULT 0,
  contest_rating INTEGER,
  rank_global INTEGER,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update platform constraint to include codechef
ALTER TABLE coding_stats DROP CONSTRAINT IF EXISTS coding_stats_platform_check;
ALTER TABLE coding_stats ADD CONSTRAINT coding_stats_platform_check 
CHECK (platform IN ('leetcode', 'codeforces', 'codechef', 'github'));

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  technologies TEXT[],
  github_url TEXT,
  live_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
