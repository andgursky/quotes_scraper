class CreateStocks < ActiveRecord::Migration
  def change
    create_table :stocks do |t|
      t.string :ticker
      t.decimal :change
      t.decimal :open
      t.decimal :height
      t.decimal :low
      t.decimal :close
      t.decimal :value

      t.timestamps
    end
  end
end
