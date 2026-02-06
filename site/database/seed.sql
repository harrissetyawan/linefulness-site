-- Seed data for Linefulness D1 Database
-- Database ID: d6604869-55c5-4509-b0a6-362241f8dd68

-- Insert Niches
INSERT OR REPLACE INTO niches (id, name, slug, icon, primary_color, seo_title, seo_description, hero_title, hero_subtitle, hero_cta_primary, hero_cta_secondary, collection_title, collection_subtitle, section_title, section_subtitle, is_default) VALUES
('lakes', 'Lakes', 'lakes', '🏕️', 'orange', 'Custom Lake Merchandise & Gifts', 'Personalized mugs, sweatshirts, and hats featuring your favorite lakes.', 'Custom Merchandise for Lake Lovers', 'Discover personalized products featuring your favorite lakes. Perfect gifts for campers, hikers, and nature enthusiasts.', 'Browse Lake Collections', 'View All Lakes', 'Collection', 'Custom {type}s featuring your favorite lakes', 'All Lakes', 'Browse all {count} lakes and find your favorite', 1),
('beaches', 'Beaches', 'beaches', '🏖️', 'blue', 'Custom Beach Merchandise & Gifts', 'Personalized mugs, sweatshirts, and hats featuring your favorite beaches.', 'Custom Merchandise for Beach Lovers', 'Discover personalized products featuring your favorite beaches. Perfect gifts for surfers, sun-seekers, and coastal enthusiasts.', 'Browse Beach Collections', 'View All Beaches', 'Collection', 'Custom {type}s featuring your favorite beaches', 'All Beaches', 'Browse all {count} beaches and find your favorite', 0),
('cities', 'Cities', 'cities', '🏙️', 'purple', 'Custom City Merchandise & Gifts', 'Personalized mugs, sweatshirts, and hats featuring your favorite cities.', 'Custom Merchandise for City Lovers', 'Discover personalized products featuring your favorite cities. Perfect gifts for travelers, urban explorers, and locals.', 'Browse City Collections', 'View All Cities', 'Collection', 'Custom {type}s featuring your favorite cities', 'All Cities', 'Browse all {count} cities and find your favorite', 0),
('gifts', 'Gifts', 'gifts', '🎁', 'green', 'Custom Gift Merchandise & Gifts', 'Personalized mugs, sweatshirts, and hats featuring your favorite gifts.', 'Custom Merchandise for Gift Lovers', 'Discover personalized products featuring your favorite gifts. Perfect gifts for any occasion.', 'Browse Gift Collections', 'View All Gifts', 'Collection', 'Custom {type}s featuring your favorite gifts', 'All Gifts', 'Browse all {count} gifts and find your favorite', 0);

-- Insert Lake Locations
INSERT OR REPLACE INTO locations (id, name, slug, type, niche_id) VALUES
('lake-tahoe', 'Lake Tahoe', 'lake-tahoe', 'Lake', 'lakes'),
('crater-lake', 'Crater Lake', 'crater-lake', 'Lake', 'lakes'),
('lake-powell', 'Lake Powell', 'lake-powell', 'Lake', 'lakes'),
('lake-mcdonald', 'Lake McDonald', 'lake-mcdonald', 'Lake', 'lakes'),
('lake-champlain', 'Lake Champlain', 'lake-champlain', 'Lake', 'lakes'),
('lake-george', 'Lake George', 'lake-george', 'Lake', 'lakes'),
('lake-superior', 'Lake Superior', 'lake-superior', 'Lake', 'lakes'),
('lake-michigan', 'Lake Michigan', 'lake-michigan', 'Lake', 'lakes'),
('lake-huron', 'Lake Huron', 'lake-huron', 'Lake', 'lakes'),
('lake-erie', 'Lake Erie', 'lake-erie', 'Lake', 'lakes'),
('lake-ontario', 'Lake Ontario', 'lake-ontario', 'Lake', 'lakes'),
('lake-winnipesaukee', 'Lake Winnipesaukee', 'lake-winnipesaukee', 'Lake', 'lakes'),
('lake-placid', 'Lake Placid', 'lake-placid', 'Lake', 'lakes'),
('lake-okeechobee', 'Lake Okeechobee', 'lake-okeechobee', 'Lake', 'lakes'),
('lake-havasu', 'Lake Havasu', 'lake-havasu', 'Lake', 'lakes'),
('lake-mead', 'Lake Mead', 'lake-mead', 'Lake', 'lakes'),
('lake-lanier', 'Lake Lanier', 'lake-lanier', 'Lake', 'lakes'),
('lake-cumberland', 'Lake Cumberland', 'lake-cumberland', 'Lake', 'lakes'),
('lake-chelan', 'Lake Chelan', 'lake-chelan', 'Lake', 'lakes'),
('lake-coeur-dalene', 'Lake Coeur d''Alene', 'lake-coeur-dalene', 'Lake', 'lakes'),
('bear-lake', 'Bear Lake', 'bear-lake', 'Lake', 'lakes'),
('yellowstone-lake', 'Yellowstone Lake', 'yellowstone-lake', 'Lake', 'lakes'),
('jenny-lake', 'Jenny Lake', 'jenny-lake', 'Lake', 'lakes'),
('lake-itasca', 'Lake Itasca', 'lake-itasca', 'Lake', 'lakes'),
('lake-texoma', 'Lake Texoma', 'lake-texoma', 'Lake', 'lakes'),
('lake-ouachita', 'Lake Ouachita', 'lake-ouachita', 'Lake', 'lakes'),
('lake-pontchartrain', 'Lake Pontchartrain', 'lake-pontchartrain', 'Lake', 'lakes'),
('lake-sunapee', 'Lake Sunapee', 'lake-sunapee', 'Lake', 'lakes'),
('lake-wallenpaupack', 'Lake Wallenpaupack', 'lake-wallenpaupack', 'Lake', 'lakes'),
('lake-norman', 'Lake Norman', 'lake-norman', 'Lake', 'lakes'),
('lake-murray', 'Lake Murray', 'lake-murray', 'Lake', 'lakes'),
('lake-travis', 'Lake Travis', 'lake-travis', 'Lake', 'lakes'),
('lake-conroe', 'Lake Conroe', 'lake-conroe', 'Lake', 'lakes'),
('lake-livingston', 'Lake Livingston', 'lake-livingston', 'Lake', 'lakes'),
('lake-fork', 'Lake Fork', 'lake-fork', 'Lake', 'lakes'),
('lake-ray-hubbard', 'Lake Ray Hubbard', 'lake-ray-hubbard', 'Lake', 'lakes'),
('lake-arrowhead', 'Lake Arrowhead', 'lake-arrowhead', 'Lake', 'lakes'),
('big-bear-lake', 'Big Bear Lake', 'big-bear-lake', 'Lake', 'lakes'),
('lake-shasta', 'Lake Shasta', 'lake-shasta', 'Lake', 'lakes'),
('lake-oroville', 'Lake Oroville', 'lake-oroville', 'Lake', 'lakes'),
('mono-lake', 'Mono Lake', 'mono-lake', 'Lake', 'lakes'),
('mammoth-lakes', 'Mammoth Lakes', 'mammoth-lakes', 'Lake', 'lakes'),
('june-lake', 'June Lake', 'june-lake', 'Lake', 'lakes'),
('pyramid-lake', 'Pyramid Lake', 'pyramid-lake', 'Lake', 'lakes'),
('lake-cascade', 'Lake Cascade', 'lake-cascade', 'Lake', 'lakes'),
('redfish-lake', 'Redfish Lake', 'redfish-lake', 'Lake', 'lakes'),
('priest-lake', 'Priest Lake', 'priest-lake', 'Lake', 'lakes'),
('flathead-lake', 'Flathead Lake', 'flathead-lake', 'Lake', 'lakes'),
('seeley-lake', 'Seeley Lake', 'seeley-lake', 'Lake', 'lakes'),
('lake-koocanusa', 'Lake Koocanusa', 'lake-koocanusa', 'Lake', 'lakes'),
('canyon-ferry-lake', 'Canyon Ferry Lake', 'canyon-ferry-lake', 'Lake', 'lakes'),
('lake-sakakawea', 'Lake Sakakawea', 'lake-sakakawea', 'Lake', 'lakes'),
('lake-oahe', 'Lake Oahe', 'lake-oahe', 'Lake', 'lakes'),
('lake-francis-case', 'Lake Francis Case', 'lake-francis-case', 'Lake', 'lakes'),
('lewis-and-clark-lake', 'Lewis and Clark Lake', 'lewis-and-clark-lake', 'Lake', 'lakes'),
('lake-mcconaughy', 'Lake McConaughy', 'lake-mcconaughy', 'Lake', 'lakes'),
('lake-dillon', 'Lake Dillon', 'lake-dillon', 'Lake', 'lakes'),
('grand-lake', 'Grand Lake', 'grand-lake', 'Lake', 'lakes'),
('lake-granby', 'Lake Granby', 'lake-granby', 'Lake', 'lakes'),
('horsetooth-reservoir', 'Horsetooth Reservoir', 'horsetooth-reservoir', 'Lake', 'lakes'),
('lake-pueblo', 'Lake Pueblo', 'lake-pueblo', 'Lake', 'lakes'),
('blue-mesa-reservoir', 'Blue Mesa Reservoir', 'blue-mesa-reservoir', 'Lake', 'lakes'),
('flaming-gorge-reservoir', 'Flaming Gorge Reservoir', 'flaming-gorge-reservoir', 'Lake', 'lakes'),
('strawberry-reservoir', 'Strawberry Reservoir', 'strawberry-reservoir', 'Lake', 'lakes'),
('utah-lake', 'Utah Lake', 'utah-lake', 'Lake', 'lakes'),
('great-salt-lake', 'Great Salt Lake', 'great-salt-lake', 'Lake', 'lakes'),
('lake-pleasant', 'Lake Pleasant', 'lake-pleasant', 'Lake', 'lakes'),
('roosevelt-lake', 'Roosevelt Lake', 'roosevelt-lake', 'Lake', 'lakes'),
('apache-lake', 'Apache Lake', 'apache-lake', 'Lake', 'lakes'),
('canyon-lake', 'Canyon Lake', 'canyon-lake', 'Lake', 'lakes'),
('saguaro-lake', 'Saguaro Lake', 'saguaro-lake', 'Lake', 'lakes'),
('elephant-butte-lake', 'Elephant Butte Lake', 'elephant-butte-lake', 'Lake', 'lakes'),
('navajo-lake', 'Navajo Lake', 'navajo-lake', 'Lake', 'lakes'),
('lake-meredith', 'Lake Meredith', 'lake-meredith', 'Lake', 'lakes'),
('lake-tenkiller', 'Lake Tenkiller', 'lake-tenkiller', 'Lake', 'lakes'),
('lake-eufaula', 'Lake Eufaula', 'lake-eufaula', 'Lake', 'lakes'),
('table-rock-lake', 'Table Rock Lake', 'table-rock-lake', 'Lake', 'lakes'),
('lake-of-the-ozarks', 'Lake of the Ozarks', 'lake-of-the-ozarks', 'Lake', 'lakes'),
('bull-shoals-lake', 'Bull Shoals Lake', 'bull-shoals-lake', 'Lake', 'lakes'),
('beaver-lake', 'Beaver Lake', 'beaver-lake', 'Lake', 'lakes'),
('norfork-lake', 'Norfork Lake', 'norfork-lake', 'Lake', 'lakes'),
('kentucky-lake', 'Kentucky Lake', 'kentucky-lake', 'Lake', 'lakes'),
('lake-barkley', 'Lake Barkley', 'lake-barkley', 'Lake', 'lakes'),
('dale-hollow-lake', 'Dale Hollow Lake', 'dale-hollow-lake', 'Lake', 'lakes'),
('norris-lake', 'Norris Lake', 'norris-lake', 'Lake', 'lakes'),
('lake-guntersville', 'Lake Guntersville', 'lake-guntersville', 'Lake', 'lakes'),
('wheeler-lake', 'Wheeler Lake', 'wheeler-lake', 'Lake', 'lakes'),
('pickwick-lake', 'Pickwick Lake', 'pickwick-lake', 'Lake', 'lakes'),
('lake-martin', 'Lake Martin', 'lake-martin', 'Lake', 'lakes'),
('lake-sinclair', 'Lake Sinclair', 'lake-sinclair', 'Lake', 'lakes'),
('lake-oconee', 'Lake Oconee', 'lake-oconee', 'Lake', 'lakes'),
('lake-moultrie', 'Lake Moultrie', 'lake-moultrie', 'Lake', 'lakes'),
('lake-marion', 'Lake Marion', 'lake-marion', 'Lake', 'lakes'),
('lake-hartwell', 'Lake Hartwell', 'lake-hartwell', 'Lake', 'lakes'),
('lake-jocassee', 'Lake Jocassee', 'lake-jocassee', 'Lake', 'lakes'),
('lake-keowee', 'Lake Keowee', 'lake-keowee', 'Lake', 'lakes'),
('smith-mountain-lake', 'Smith Mountain Lake', 'smith-mountain-lake', 'Lake', 'lakes'),
('lake-anna', 'Lake Anna', 'lake-anna', 'Lake', 'lakes'),
('deep-creek-lake', 'Deep Creek Lake', 'deep-creek-lake', 'Lake', 'lakes'),
('raystown-lake', 'Raystown Lake', 'raystown-lake', 'Lake', 'lakes');

-- Insert Beach Locations
INSERT OR REPLACE INTO locations (id, name, slug, type, niche_id) VALUES
('miami-beach', 'Miami Beach', 'miami-beach', 'Beach', 'beaches'),
('malibu-beach', 'Malibu Beach', 'malibu-beach', 'Beach', 'beaches'),
('waikiki-beach', 'Waikiki Beach', 'waikiki-beach', 'Beach', 'beaches'),
('venice-beach', 'Venice Beach', 'venice-beach', 'Beach', 'beaches'),
('santa-monica', 'Santa Monica', 'santa-monica', 'Beach', 'beaches');

-- Insert City Locations
INSERT OR REPLACE INTO locations (id, name, slug, type, niche_id) VALUES
('new-york', 'New York', 'new-york', 'City', 'cities'),
('los-angeles', 'Los Angeles', 'los-angeles', 'City', 'cities'),
('chicago', 'Chicago', 'chicago', 'City', 'cities'),
('san-francisco', 'San Francisco', 'san-francisco', 'City', 'cities'),
('austin', 'Austin', 'austin', 'City', 'cities'),
('seattle', 'Seattle', 'seattle', 'City', 'cities');

-- Insert Gift Locations
INSERT OR REPLACE INTO locations (id, name, slug, type, niche_id) VALUES
('birthday', 'Birthday', 'birthday', 'Gift', 'gifts'),
('christmas', 'Christmas', 'christmas', 'Gift', 'gifts'),
('valentines-day', 'Valentine''s Day', 'valentines-day', 'Gift', 'gifts'),
('anniversary', 'Anniversary', 'anniversary', 'Gift', 'gifts'),
('graduation', 'Graduation', 'graduation', 'Gift', 'gifts');

-- Insert Templates for Lakes Niche
INSERT OR REPLACE INTO templates (id, niche_id, type, product_id_pd, text_variable, image_variable, max_text_length, image_aspect_ratio, display_order) VALUES
('template-lake-mug', 'lakes', 'Mug', '256657138688428297', 't_text1_txt', 't_image1_iid', 25, '1:1', 1),
('template-lake-sweatshirt', 'lakes', 'Sweatshirt', '256687649014042354', 't_text1_txt', 't_image1_iid', 30, '1:1', 2),
('template-lake-hat', 'lakes', 'Hat', '256009887799526931', 't_text1_txt', 't_image1_iid', 20, '1:1', 3),
('template-lake-men-shirt', 'lakes', 'Men Shirt', '256352518857340066', 't_text1_txt', 't_image1_iid', 20, '1:1', 4);

-- Insert Templates for Beaches Niche
INSERT OR REPLACE INTO templates (id, niche_id, type, product_id_pd, text_variable, image_variable, max_text_length, image_aspect_ratio, display_order) VALUES
('template-beach-mug', 'beaches', 'Mug', '256657138688428297', 't_text1_txt', 't_image1_iid', 25, '1:1', 1),
('template-beach-tshirt', 'beaches', 'T-Shirt', '256687649014042354', 't_text1_txt', 't_image1_iid', 30, '1:1', 2);

-- Insert Templates for Cities Niche
INSERT OR REPLACE INTO templates (id, niche_id, type, product_id_pd, text_variable, image_variable, max_text_length, image_aspect_ratio, display_order) VALUES
('template-city-mug', 'cities', 'Mug', '256657138688428297', 't_text1_txt', 't_image1_iid', 25, '1:1', 1),
('template-city-hoodie', 'cities', 'Hoodie', '256687649014042354', 't_text1_txt', 't_image1_iid', 30, '1:1', 2);

-- Insert Templates for Gifts Niche
INSERT OR REPLACE INTO templates (id, niche_id, type, product_id_pd, text_variable, image_variable, max_text_length, image_aspect_ratio, display_order) VALUES
('template-gift-women-shirt', 'gifts', 'Shirt for Women', '256308685276558046', 't_text1_txt', 't_image1_iid', 25, '1:1', 1),
('template-gift-bucket-hat', 'gifts', 'Bucket Hat', '256879401522860408', 't_text1_txt', 't_image1_iid', 25, '1:1', 2);

-- Insert Site Configuration
INSERT OR REPLACE INTO site_config (id, brand_name, brand_tagline, footer_tagline, footer_description, site_url) VALUES
(1, 'Linefulness', 'Custom Merchandise for Every Passion', 'Custom merchandise for every passion.', 'Personalized products featuring your favorite places, hobbies, and more.', 'https://linefulness.com');

-- Insert Navigation Items
INSERT OR REPLACE INTO navigation (id, label, href, display_order, is_active) VALUES
('nav-home', 'Home', '/', 1, 1),
('nav-collections', 'Collections', '/#niches', 2, 1);

-- Insert Navigation Children
INSERT OR REPLACE INTO navigation (id, label, href, parent_id, description, display_order, is_active) VALUES
('nav-lakes', 'Lakes', '/lakes', 'nav-collections', 'Custom lake merchandise', 1, 1),
('nav-beaches', 'Beaches', '/beaches', 'nav-collections', 'Beach-themed products', 2, 1),
('nav-cities', 'Cities', '/cities', 'nav-collections', 'City merchandise', 3, 1);

-- Insert Zazzle Configuration
INSERT OR REPLACE INTO zazzle_config (id, associate_id_rf, member_id_at, store_id_sr, category_id_cg) VALUES
(1, '238975517577791237', '238975517577791237', 'linefulness', '196167236993318158');
