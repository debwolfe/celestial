class MeteoritesController < ApplicationController
  def index
  end

  def biggest
    #meteorite = Meteorite.order('mass DESC LIMIT 1').pluck(:mass, :reclat, :reclong, :year)
    meteorite = Meteorite.order('mass DESC LIMIT 1')
    render json: meteorite
  end

  def top_10
    meteorite = Meteorite.order('mass DESC LIMIT 10')
    render json: meteorite    
  end

  def by_year
    # consider limiting by year
    meteorites = {}
    data = Meteorite.where("year >= 1800").order('year')
    data.each do |meteorite|
      meteorites[meteorite[:year]] = [] unless meteorites.has_key?(meteorite[:year])

      meteorites[meteorite[:year]] << [meteorite[:mass], meteorite[:reclat], meteorite[:reclong]]
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
    meteorites_by_year = {}
    meteorites = Meteorite.group(:year).count
    render json: meteorites
  end

  def show
    meteorite = Meteorite.find(params[:id ])
    render json: meteorite
  end

end
