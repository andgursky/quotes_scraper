class ChangeValueTypeInStocks < ActiveRecord::Migration
  def change
    change_column :stocks, :value, :integer
  end
end
