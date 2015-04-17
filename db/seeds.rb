Meteorite.delete_all
file_to_load = File.dirname(__FILE__) + "/meteorite_landings.csv"

File.open(file_to_load) do |meteorites|
  meteorites.read.each_line do |meteorite|
    name, nametype, recclass, mass, fall, year, id, reclat, reclong, geoLocation = meteorite.chomp.split(",")
    Meteorite.create!(name: name, nametype: nametype, recclass: recclass, mass: mass,
      fall: fall, year: year, reclat: reclat, reclong: reclong)
  end
end
