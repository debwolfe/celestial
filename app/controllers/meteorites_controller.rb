class MeteoritesController < ApplicationController
  def index
  end

  def biggest
    #meteorite = Meteorite.order('mass DESC LIMIT 1').pluck(:mass, :reclat, :reclong, :year)
    meteorite = Meteorite.order('mass DESC LIMIT 1')
    render json: meteorite
  end

  def by_year
    meteorites = Meteorite.where("year > '1900'").order('year LIMIT 1000').pluck(:mass, :reclat, :reclong, :year)
    render json: meteorites
  end

  def by_name
    meteorites = Meteorite.order('name').pluck(:name, :year)
    render json: meteorites
  end

  def by_material
    meteorites = Meteorite.group(:recclass).count
    render json: meteorites
  end

  def show
    @meteorite = Meteorite.find(params[:id ])
  end

end
