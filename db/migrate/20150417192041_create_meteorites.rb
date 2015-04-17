class CreateMeteorites < ActiveRecord::Migration
  def change
    create_table :meteorites do |t|
      t.string :name
      t.string :nametype
      t.string :recclass
      t.string :mass
      t.string :fall
      t.string :year
      t.string :reclat
      t.string :reclong

      t.timestamps null: false
    end
  end
end
