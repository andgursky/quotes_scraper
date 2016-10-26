class StocksController < ApplicationController
  respond_to :json, :xlsx

  def index
    @stocks = Stock.all
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
    importer = Importer.new(Stock.all)
    updated_data = importer.get_data
    updated_data.each do |h|
      id = Stock.find_by_ticker(h[:ticker]).id
      Stock.update(id, h)
    end
    respond_with Stock.all and return
  end

  def destroy
    respond_with Stock.destroy(params[:id])
  end

  def download
    @stocks = Stock.all
    render xlsx: 'download', template: 'stocks/download',
      filename: "download.xlsx"
  end

  private

  def stock_params
    params.require(:stock).permit(:ticker, :change, :open, :height, :low,
                                  :close, :value)
  end

end
