class Meteorite < ActiveRecord::Base

  def index
    @meteorite = Meteorite.all
  end
end
