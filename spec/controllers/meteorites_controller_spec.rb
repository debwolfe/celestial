require 'rails_helper'

RSpec.describe MeteoritesController, type: :controller do

  describe 'GET #index' do
    before(:each) do
      get :index
    end

    it 'returns a status of 200' do
      expect(response.status).to eq(200)
    end

    it 'shows home page using index template' do
      expect(response).to render_template :index
    end
  end

  # test that post returns 404

  # test that destroy returns 404



end
