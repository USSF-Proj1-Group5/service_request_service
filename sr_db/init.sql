CREATE TABLE service_requests (id serial PRIMARY KEY, sr_name text, sr_contractor text, sr_task text);
INSERT INTO service_requests (sr_name, sr_contractor, sr_task) VALUES 
    ('water heater', 'Good guy LLC', 'inspect'),
    ('paint house', 'quality painters inc', 'paint house');