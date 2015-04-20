require 'rails_helper'

RSpec.describe Meteorite, type: :model do

  context 'validations' do
    it 'is valid with presence of name, mass, year, lat and long' do
      meteorite = FactoryGirl.create(:meteorite, name: "Chernobyl", mass: 10.9, year: 2013, reclat: 51.2722, reclong: 30.2242)
      expect(meteorite).to(be_valid)
    end

     it { should validate_presence_of :name}
     it { should validate_presence_of :mass}
     it { should validate_presence_of :year}
     it { should validate_presence_of :reclat}
     it { should validate_presence_of :reclong}

    it 'is not valid without name' do
      # do not use factories as that is a valid record
      meteorite = Meteorite.create(mass: 10.9, year: 2013, reclat: 51.2722, reclong: 30.2242)
      expect(meteorite).to_not be_valid
    end

    it 'is not valid without mass' do
      meteorite = Meteorite.create(name: "Chernobyl", year: 2013, reclat: 51.2722, reclong: 30.2242)
      expect(meteorite).to_not be_valid
    end

    it 'is not valid without year' do
      meteorite = Meteorite.create(name: "Chernobyl", mass: 10.9, reclat: 51.2722, reclong: 30.2242)
      expect(meteorite).to_not be_valid
    end

    it 'is not valid without lat' do
      meteorite = Meteorite.create(name: "Chernobyl", mass: 10.9, year: 2013, reclong: 30.2242)
      expect(meteorite).to_not be_valid
    end

    it 'is not valid without lat' do
      meteorite = Meteorite.create(name: "Chernobyl", mass: 10.9, year: 2013, reclong: 30.2242)
      expect(meteorite).to_not be_valid
    end

    it 'is not valid without long' do
      meteorite = Meteorite.create(  name: "Chernobyl", mass: 10.9, year: 2013, reclat: 51.2722)
      expect(meteorite).to_not be_valid
    end
  end

  context 'hemisphere' do
    Meteorite.delete_all

    it 'should return 1 for northeast lat long' do
     northeast_meteorite = FactoryGirl.create(:meteorite, name: "Chernobyl", mass: 10.9, year: 2013, reclat: 51.2722, reclong: 30.2242)
     expect( Meteorite.hemisphere("northeast") ).to eq 1
    end

     it 'should return 1 for northwest lat long' do
     northwest_meteorite = FactoryGirl.create(:meteorite, name: "Benicia", mass: 10.9, year: 2013, reclat: 38.06, reclong: -122.15)
     expect( Meteorite.hemisphere("northwest") ).to eq 1
    end

     it 'should return 1 for southeast lat long' do
     southeast_meteorite = FactoryGirl.create(:meteorite, name: "Brisbane", mass: 10.9, year: 2013, reclat: -27.47, reclong: 153.03)
     expect( Meteorite.hemisphere("southeast") ).to eq 1
    end

    it 'should return 1 for southwest lat long' do
     southwest_meteorite = FactoryGirl.create(:meteorite, name: "Goiás", mass: 10.9, year: 2013, reclat: -15.933, reclong: -50.133)
     expect( Meteorite.hemisphere("southwest") ).to eq 1
    end


  end


end
