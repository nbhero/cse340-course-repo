-- ========================================
-- Organization Table
-- ========================================

CREATE TABLE organization (
organization_id SERIAL PRIMARY KEY,
name varchar(150) NOT NULL,
description TEXT NOT NULL,
contact_email varchar(255) NOT NULL,
logo_filename varchar(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Service Project Table
-- ========================================

CREATE TABLE service_project (
project_id SERIAL PRIMARY KEY,
organization_id INT NOT NULL REFERENCES organization(organization_id),
title varchar(150) NOT NULL,
description TEXT NOT NULL,
location varchar(255) NOT NULL,
project_date DATE NOT NULL
);

-- ========================================
-- Insert sample data: Service Projects
-- ========================================
INSERT INTO service_project (organization_id, title, description, location, project_date)
VALUES
(1, 'Community Playground Build', 'Construct a new playground with sustainable materials for a local elementary school.', 'Rexburg, ID', '2026-08-15'),
(1, 'Neighborhood Sidewalk Repair', 'Repair and improve sidewalks to increase accessibility in an aging neighborhood.', 'Idaho Falls, ID', '2026-09-12'),
(2, 'Urban Garden Planting Day', 'Plant a community vegetable garden and teach residents about food sustainability.', 'Rexburg, ID', '2026-08-22'),
(3, 'Food Bank Sorting Event', 'Organize and sort donations at the regional food bank to prepare for holiday distribution.', 'Rigby, ID', '2026-11-07');

-- ========================================
-- Category Table
-- ========================================

CREATE TABLE category (
category_id SERIAL PRIMARY KEY,
name varchar(100) NOT NULL UNIQUE
);

-- ========================================
-- Insert sample data: Categories
-- ========================================
INSERT INTO category (name)
VALUES
('Construction & Infrastructure'),
('Environment & Sustainability'),
('Hunger & Food Relief'),
('Education & Mentoring');

-- ========================================
-- Project Category Table (junction table)
-- A service project can belong to many categories,
-- and a category can include many service projects.
-- ========================================

CREATE TABLE project_category (
project_id INT NOT NULL REFERENCES service_project(project_id) ON DELETE CASCADE,
category_id INT NOT NULL REFERENCES category(category_id) ON DELETE CASCADE,
PRIMARY KEY (project_id, category_id)
);

-- ========================================
-- Insert sample data: Project Categories
-- ========================================
INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1), -- Community Playground Build -> Construction & Infrastructure
(2, 1), -- Neighborhood Sidewalk Repair -> Construction & Infrastructure
(3, 2), -- Urban Garden Planting Day -> Environment & Sustainability
(3, 4), -- Urban Garden Planting Day -> Education & Mentoring
(4, 3); -- Food Bank Sorting Event -> Hunger & Food Relief