-- Insert sample admin user
INSERT INTO users (email, password_hash, role) VALUES 
('admin@college.edu', '$2a$10$example_hash_admin', 'admin');

-- Insert sample student users
INSERT INTO users (email, password_hash, role) VALUES 
('john.doe@student.edu', '$2a$10$example_hash_student1', 'student'),
('jane.smith@student.edu', '$2a$10$example_hash_student2', 'student'),
('alex.johnson@student.edu', '$2a$10$example_hash_student3', 'student');

-- Insert sample student profiles
INSERT INTO student_profiles (user_id, student_id, name, email, department, year, cgpa, github_username, leetcode_username, codeforces_username, skills, placement_status) VALUES 
((SELECT id FROM users WHERE email = 'john.doe@student.edu'), 'CS2021001', 'John Doe', 'john.doe@student.edu', 'Computer Science', 4, 8.5, 'johndoe', 'john_doe_lc', 'johndoe_cf', ARRAY['JavaScript', 'React', 'Node.js', 'Python'], 'placed'),
((SELECT id FROM users WHERE email = 'jane.smith@student.edu'), 'CS2021002', 'Jane Smith', 'jane.smith@student.edu', 'Computer Science', 4, 9.2, 'janesmith', 'jane_smith_lc', 'janesmith_cf', ARRAY['Java', 'Spring Boot', 'MySQL', 'AWS'], 'in_process'),
((SELECT id FROM users WHERE email = 'alex.johnson@student.edu'), 'IT2021003', 'Alex Johnson', 'alex.johnson@student.edu', 'Information Technology', 3, 7.8, 'alexjohnson', 'alex_johnson_lc', 'alexjohnson_cf', ARRAY['Python', 'Django', 'PostgreSQL', 'Docker'], 'not_placed');

-- Update student profiles to include CodeChef usernames
UPDATE student_profiles SET codechef_username = 'johndoe_cc' WHERE student_id = 'CS2021001';
UPDATE student_profiles SET codechef_username = 'janesmith_cc' WHERE student_id = 'CS2021002';
UPDATE student_profiles SET codechef_username = 'alexjohnson_cc' WHERE student_id = 'IT2021003';

-- Insert sample assessments
INSERT INTO assessments (title, description, total_marks, duration_minutes, assessment_date) VALUES 
('Data Structures & Algorithms Test 1', 'Basic DSA concepts and problem solving', 100, 120, '2024-01-15'),
('System Design Assessment', 'Design scalable systems and architecture', 100, 180, '2024-01-22'),
('Programming Fundamentals', 'Core programming concepts and coding', 100, 90, '2024-01-08');

-- Insert sample student assessments
INSERT INTO student_assessments (student_id, assessment_id, score, rank, feedback) VALUES 
((SELECT id FROM student_profiles WHERE student_id = 'CS2021001'), (SELECT id FROM assessments WHERE title = 'Data Structures & Algorithms Test 1'), 85, 2, 'Good understanding of algorithms, needs improvement in time complexity analysis'),
((SELECT id FROM student_profiles WHERE student_id = 'CS2021002'), (SELECT id FROM assessments WHERE title = 'Data Structures & Algorithms Test 1'), 92, 1, 'Excellent problem-solving skills and clean code implementation'),
((SELECT id FROM student_profiles WHERE student_id = 'CS2021001'), (SELECT id FROM assessments WHERE title = 'System Design Assessment'), 78, 3, 'Good system thinking, work on scalability concepts');

-- Insert sample placements
INSERT INTO placements (student_id, company_name, position, package_lpa, offer_date, status, interview_stages) VALUES 
((SELECT id FROM student_profiles WHERE student_id = 'CS2021001'), 'TechCorp Solutions', 'Software Engineer', 12.5, '2024-02-01', 'accepted', ARRAY['Online Test', 'Technical Round 1', 'Technical Round 2', 'HR Round']);

-- Insert sample coding stats
INSERT INTO coding_stats (student_id, platform, problems_solved, contest_rating, rank_global) VALUES 
((SELECT id FROM student_profiles WHERE student_id = 'CS2021001'), 'leetcode', 450, 1650, 25000),
((SELECT id FROM student_profiles WHERE student_id = 'CS2021001'), 'codeforces', 280, 1420, 45000),
((SELECT id FROM student_profiles WHERE student_id = 'CS2021002'), 'leetcode', 520, 1780, 18000),
((SELECT id FROM student_profiles WHERE student_id = 'CS2021002'), 'codeforces', 320, 1580, 32000),
((SELECT id FROM student_profiles WHERE student_id = 'CS2021001'), 'codechef', 320, 1580, 35000),
((SELECT id FROM student_profiles WHERE student_id = 'CS2021002'), 'codechef', 380, 1720, 28000),
((SELECT id FROM student_profiles WHERE student_id = 'IT2021003'), 'codechef', 250, 1380, 48000);

-- Insert sample projects
INSERT INTO projects (student_id, title, description, technologies, github_url) VALUES 
((SELECT id FROM student_profiles WHERE student_id = 'CS2021001'), 'E-commerce Platform', 'Full-stack e-commerce application with payment integration', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], 'https://github.com/johndoe/ecommerce-platform'),
((SELECT id FROM student_profiles WHERE student_id = 'CS2021002'), 'Task Management System', 'Collaborative task management tool with real-time updates', ARRAY['Java', 'Spring Boot', 'MySQL', 'WebSocket'], 'https://github.com/janesmith/task-manager');
