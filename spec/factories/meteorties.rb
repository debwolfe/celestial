FactoryGirl.define do
  factory :meteorite, :class => Meteorite do |m|
  m.name 'Chelyabinsk'
  m.recclass 'LL5'
  m.mass 100000
  m.fall 'Fell'
  m.year 2013
  m.reclat 54.816670
  m.reclong 61.116670
  end
end
