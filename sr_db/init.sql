CREATE TABLE service_requests (id serial PRIMARY KEY, sr_name text, contractor text, task text);
INSERT INTO service_requests (sr_name, contractor, task) VALUES 
    ('water heater', 'Good guy LLC', 'inspect'),
    ('paint house', 'quality painters inc', 'paint house');