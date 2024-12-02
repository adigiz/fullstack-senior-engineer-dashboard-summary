
-- Insert sample data into the patients table
INSERT INTO patient (name, age, avatar, gender, contact, "dateOfBirth")
VALUES
('John Doe', 45,'https://randomuser.me/api/portraits/women/3.jpg', 'Male', '555-1234', '1985-06-15'),
('Jane Smith', 32,'https://randomuser.me/api/portraits/women/4.jpg', 'Female', '555-5678', '1985-06-15');

-- Insert sample data into the diagnoses table
INSERT INTO diagnosis (diagnosis, date, "patientId")
VALUES
('Hypertension', '2023-10-20', 1),
('Diabetes', '2023-09-15', 2);

-- Insert sample data into the medications table
INSERT INTO medication (name, dosage, frequency, "patientId")
VALUES
('Amlodipine', '5mg', 'Once daily', 1),
('Metformin', '500mg', 'Twice daily', 2);

-- Insert sample data into the allergies table
INSERT INTO allergy (allergy, severity, "patientId")
VALUES
('Peanuts', 'Severe', 1),
('Dust', 'Mild', 2);

-- Insert sample data into the appointments table
INSERT INTO appointment (date, time, room, "patientId")
VALUES
('2023-12-01', '10:00:00', '101', 1),
('2023-12-02', '11:30:00', '102', 2);
