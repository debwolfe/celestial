class MeteoritesController < ApplicationController
  def index
  end

  def biggest
    #meteorite = Meteorite.order('mass DESC LIMIT 1').pluck(:mass, :reclat, :reclong, :year)
    meteorite = Meteorite.order('mass DESC LIMIT 1')
    render json: meteorite
  end

  def by_year
    # consider limiting by year
    year = 1800
    meteorites = {}
    until year == 2014
      meteorites[year] = []
      meteorites[year] << Meteorite.where("year = #{year}").order('year').pluck(:mass, :reclat, :reclong)
      meteorites[year].flatten!(1)
     year += 1
    end
    render json: meteorites
  end

  def by_name
    meteorites = Meteorite.order('name').pluck(:name, :year)
    render json: meteorites
  end

  def group_by_material
    meteorites = Meteorite.group(:recclass).count
    render json: meteorites
  end

  def group_by_year
    meteorites = Meteorite.group(:year).count
    meteorites.sort
    render json: meteorites
  end

  def show
    @meteorite = Meteorite.find(params[:id ])
  end

end
