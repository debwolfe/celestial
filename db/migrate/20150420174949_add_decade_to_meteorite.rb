class AddDecadeToMeteorite < ActiveRecord::Migration
  def change
    add_column :meteorites, :decade, :integer
  end
end
