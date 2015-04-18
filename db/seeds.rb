require 'csv'

Meteorite.delete_all
file_to_load = File.dirname(__FILE__) + "/meteorites-v2.csv"

csv_text = File.read(file_to_load)
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
    Meteorite.create!(row.to_hash)
end

