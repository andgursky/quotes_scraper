class StocksController < ApplicationController
  respond_to :json

  def index
    respond_with Stock.all
  end

  def show
    binding.pry
    respond_with Stock.find(params[:id])
  end

  def create
    respond_with Stock.create(stock_params)
  end

  def update
    respond_with Stock.update(params[:id], params[:stock])
  end

  def destroy
    respond_with Stock.destroy(params[:id])
  end

  private

  def stock_params
    params.require(:stock).permit(:ticker, :change, :open, :height, :low,
                                  :close, :value)
  end

end
