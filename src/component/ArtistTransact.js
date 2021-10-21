import SmallLoader from './SmallLoader';
import TokenChart from './TokenChart';
import { useHistory } from 'react-router-dom';

const ArtistTransact = ({
    balance,
    artist,
    MintPrice,
    historicalData,
    token,
    provider,
    setsell,
    setbuy,
    setconnectedwallet
}) => {
    const history = useHistory();

    console.log({ balance });

    const displayTokenPrice = () => {
        if (MintPrice && MintPrice !== '') {
            // const converted = Number(MintPrice).toFixed(4);
            return (
                <div className="dollar-price">
                    <span>$</span> {MintPrice}
                </div>
            );
        } else {
            return <SmallLoader />
        }
    };

    const displayBalance = () => {
        let balanceInUSD = MintPrice * balance;
        balanceInUSD = balanceInUSD.toFixed(2);
        if (MintPrice && MintPrice !== '') {
            return (
                <div className="dollar-price">
                    {balance
                        ? `${artist.social_token_symbol} ${balance} 
              \u00A0 = \u00A0($${balanceInUSD})`
                        : `0.0 ${artist.social_token_symbol}`}
                </div>
            );
        } else {
            return <div>loading balance ..</div>
        }
    };

    return (
        <div className="token-chart">
            <div className="chart-header-row d-flex flex-row justify-content-between col-12">
                <div className="token-info">
                    <div className="card-heading">{artist.social_token_symbol} Price</div>
                    <div className="dollar-price">{displayTokenPrice()}</div>
                    <div className="small-heading">--</div>
                </div>
                <div className="card-heading" style={{marginTop: 15, paddingLeft: 700}}>Available Balance: </div>
                    <div className="dollar-price" style={{marginTop: 10}}>
                        <div >{displayBalance()}</div>
                    </div>
            </div>

            <div className="total-bal-chart" style={{height: 250}}>
                <TokenChart artist={artist} historicalData={historicalData} />
            </div>

            <div className="buy-sell-buttons col-4 offset-4">
                <div className="d-flex justify-content-around align-items-center mt-5">
                    {token && token.trim() === '' ? (
                        <button
                            className="buy-button"
                            type="button"
                            onClick={() => {
                                // window.location.href = "/login";
                                history.push('/');
                            }}
                        >
                            Sell
                        </button>
                    ) : provider ? (
                        <button
                            className="buy-button"
                            type="button"
                            onClick={() => setsell((sell) => !sell)}
                        >
                            Sell
                        </button>
                    ) : (
                        <button
                            className="buy-button"
                            type="button"
                            onClick={() =>
                                setconnectedwallet((connectedwallet) => !connectedwallet)
                            }
                        >
                            Sell
                        </button>
                    )}

                    {token && token.trim() === '' ? (
                        <button
                            className="sell-button"
                            type="button"
                            onClick={() => {
                                // window.location.href = "/login";
                                history.push('/');
                            }}
                        >
                            Buy
                        </button>
                    ) : provider ? (
                        <button
                            className="sell-button"
                            type="button"
                            onClick={() => setbuy((buy) => !buy)}
                        >
                            Buy
                        </button>
                    ) : (
                        <button
                            className="sell-button"
                            type="button"
                            onClick={() =>
                                setconnectedwallet((connectedwallet) => !connectedwallet)
                            }
                        >
                            Buy
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArtistTransact;
