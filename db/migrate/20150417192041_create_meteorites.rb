class CreateMeteorites < ActiveRecord::Migration
  def change
    create_table :meteorites do |t|
      t.string :name
      t.string :recclass
      t.decimal :mass
      t.string :fall
      t.integer :year
      t.decimal :reclat
      t.decimal :reclong
      t.timestamps null: false
    end
  end
end
