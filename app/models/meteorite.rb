class Meteorite < ActiveRecord::Base

  def self.hemisphere(hemisphere)
    case hemisphere
    when 'northeast'
      return Meteorite.where('reclong > ? AND reclat > ?', 0, 0).length
    when 'northwest'
      return Meteorite.where('reclong > ? AND reclat < ?', 0, 0).length
    when 'southeast'
      return Meteorite.where('reclong < ? AND reclat > ?', 0, 0).length
    when 'southwest'
      return Meteorite.where('reclong < ? AND reclat < ?', 0, 0).length
    end
  end

end
