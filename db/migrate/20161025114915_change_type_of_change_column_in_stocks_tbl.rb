class ChangeTypeOfChangeColumnInStocksTbl < ActiveRecord::Migration
  def change
    change_column :stocks, :change, :string
  end
end
