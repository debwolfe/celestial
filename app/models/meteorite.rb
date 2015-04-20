class Meteorite < ActiveRecord::Base
  validates_presence_of :name, :mass, :year, :reclat, :reclong

  def self.hemisphere(hemisphere)
    case hemisphere
    when 'northeast'
      return Meteorite.where('reclat > ? AND reclong > ?', 0, 0).length
    when 'northwest'
      return Meteorite.where('reclat > ? AND reclong < ?', 0, 0).length
    when 'southeast'
      return Meteorite.where('reclat < ? AND reclong > ?', 0, 0).length
    when 'southwest'
      return Meteorite.where('reclat < ? AND reclong < ?', 0, 0).length
    end
  end

end
