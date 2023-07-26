import yfinance as yf
import pandas as pd

try:
    # Download historical data as a pandas DataFrame
    data = yf.download('DIA', start='2007-12-01', end='2023-01-01')

    # If the DataFrame is empty, raise an exception
    if data.empty:
        raise ValueError('No data downloaded')

    # Print the first few rows
    print(data.head())

    # Save the data to a CSV file
    data.to_csv('data/dowjones_stock_data.csv')

except Exception as e:
    print(f'An error occurred: {e}')


# import pandas as pd
# import requests
# import json

# def get_data(symbol):
#     api_key = 'JGQU3QBXZR7B2FCN'  # replace with your own API key
#     base_url = 'https://www.alphavantage.co/query?'
#     function = 'TIME_SERIES_DAILY'
#     datatype = 'csv'

#     # construct the API call
#     api_call = f'{base_url}function={function}&symbol={symbol}&apikey={api_key}&datatype={datatype}'

#     # make the API request
#     response = requests.get(api_call)

#     # parse the response
#     data = pd.read_csv(pd.compat.StringIO(response.text))

#     return data

# # get Apple's stock data
# data = get_data('AAPL')

# # filter data from December 2007 to January 2023
# data['timestamp'] = pd.to_datetime(data['timestamp'])
# data = data[(data['timestamp'] >= '2007-12-01') & (data['timestamp'] <= '2023-01-01')]

# # save to a CSV file
# data.to_csv('apple_stock_data.csv', index=False)
