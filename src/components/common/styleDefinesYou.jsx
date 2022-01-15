import React from "react";

const StylesDefineYouBest = props => {
  const {
    couponCodeApplied,
    finalPaybleAmount,
    promoDiscountAmount,
    promocode,
    selectedPlan
  } = props;
  return (
    <React.Fragment>
      <div className="card-title">Order Details</div>
      <div className="card-body">
        {/* <p className="message-onSubscribe">
          We automatically renew your Monthly Subscription each month. You can
          cancel your automatic renewal at any time by logging in and visiting
          your "Account" section on kloxet.com.
        </p> */}
        <div className="row">
          <div className="col">
            <table className="table">
              <tbody>
                <tr>
                  <td>Subscription Plan</td>
                  <td>${selectedPlan.price}.00</td>
                </tr>
                <tr>
                  <td>Shipping Cost</td>
                  <td>Free</td>
                </tr>

                {couponCodeApplied && (
                  <tr>
                    <td>Promo - {promocode}</td>
                    <td>-${promoDiscountAmount}.00</td>
                  </tr>
                )}
                <tr>
                  <th>Grand Total</th>
                  <td>${finalPaybleAmount}.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StylesDefineYouBest;
