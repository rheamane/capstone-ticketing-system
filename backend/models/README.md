Houses your database models or schemas. These define the structure of your data

Here is the current Ideas

CREATE TABLE roles (
role_id INT AUTO_INCREMENT PRIMARY KEY,
role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE tickets (
ticket_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
status ENUM('open', 'ongoing', 'resolved') DEFAULT 'open',
category ENUM('grade appeal', 'sponsor issue', 'team issue', 'extension', 'other') NOT NULL,
created_by INT NOT NULL, -- FK to users table
assigned_to INT, -- FK to users table (TA/Admin)
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (created_by) REFERENCES users(user_id),
FOREIGN KEY (assigned_to) REFERENCES users(user_id)
);

CREATE TABLE comments (
comment_id INT AUTO_INCREMENT PRIMARY KEY,
ticket_id INT NOT NULL, -- FK to tickets table
user_id INT NOT NULL, -- FK to users table
content TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE ticket_students (
ticket_id INT NOT NULL, -- FK to tickets table
student_id INT NOT NULL, -- FK to users table
PRIMARY KEY (ticket_id, student_id),
FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id),
FOREIGN KEY (student_id) REFERENCES users(user_id)
);

CREATE TABLE ticket_history (
history_id INT AUTO_INCREMENT PRIMARY KEY,
ticket_id INT NOT NULL, -- FK to tickets table
changed_by INT NOT NULL, -- FK to users table
old_status ENUM('open', 'ongoing', 'resolved'),
new_status ENUM('open', 'ongoing', 'resolved'),
changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id),
FOREIGN KEY (changed_by) REFERENCES users(user_id)
);

CREATE TABLE notifications (
notification_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL, -- FK to users table
ticket_id INT NOT NULL, -- FK to tickets table
message TEXT NOT NULL,
is_read BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id)
);
