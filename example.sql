CREATE TABLE links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    link TEXT NOT NULL
);
INSERT INTO links (name, link) 
VALUES 
('Google', 'https://www.google.com'),
('OpenAI', 'https://www.openai.com');
