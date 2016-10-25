class Importer
require 'capybara/dsl'
require 'selenium-webdriver'

Capybara.configure do |config|
  config.default_driver = :selenium
end

include Capybara::DSL

  URL = "https://finance.yahoo.com/quotes/"

  def initialize(stocks_arr)
    #setting array of stocks
    #taking the remote url with data
    @stocks_json = stocks_arr.as_json
    @url = create_url
    @blobs = Array.new
  end

  def get_data
    #visit yahoo and store stocks data
    visit @url

    fetch_html_data.each do |block|
      blob = parse(block)
      @blobs << blob
    end
    @blobs
  end

  private

  def fetch_html_data
    #scraping text data block and return array of blocks
    regexp = /Quotes\s+delayed,\s+except\s+where\s+indicated\s+
               otherwise\.\s+[\w]+\s+currency\s+is\s+USD\./ix
    text_data_block = all(:xpath, ".//div/div/div[contains(.,'View " +
                      "Comparison Chart')]" +
                      "/following-sibling::div")[0].text
    @arr_data_blocks = text_data_block.split(regexp)
  end

  def create_url
    #take all tikers and put them to string with comma separator
    tickers_str = ""
    @stocks_json.each do |h|
      if tickers_str != ""
        tickers_str += ','
      end
      tickers_str += h["ticker"].gsub(/\s/, '')
    end
    URL + "#{tickers_str}/view/dv?bypass=true&ltr=1"
  end

  def parse(block)
    #parse text block and return hash of stocks data
    regexp = /\((?<exchange>[\w]+):\s+
      (?<ticker>[\w\d.^]+)\)\s+Last\s+Trade:\s+
      (?<close>[\d.,]+)\s+Day\'s\s+Range\s+
      (?<low>([\d.,]+|N\/A))\s*-\s*
      (?<height>([\d.,]+|N\/A)).+Change:\s+
      (?<change_in_doll>[\d.,+-]+)\s+\(
      (?<change_in_perc>[\d.,+-]+)%\)\s+Volume:\s+
      (?<volume>[\d,.]+)\s+.+Open:\s+
      (?<open>[\d.,]+)\s+/ix
    m = block.match(regexp)
    { ticker:m["ticker"], change:m["change_in_perc"], open:m["open"],
      height:m["height"], low:m["low"], close:m["close"],
      value:m["volume"].gsub(/\,/, '') }
  end

end
