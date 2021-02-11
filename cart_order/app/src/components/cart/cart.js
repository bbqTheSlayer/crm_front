import React, {Component} from 'react';

export default class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    getCount(Val){
        this.props.setStoreField('ProductCount', Val)
    }

    getProductKey(Val){
        this.props.setStoreField('ProductKey', Val);
    }

    getProductKeyRemove(Val){
        this.props.setStoreField('ProductRemove', Val);
    }

    changeHadler(e)
    {
        this.getCount(e.target.value);
        this.getProductKey(e.target.name);

    }

    getKey(e)
    {
      this.getProductKeyRemove(e.target.name);
    }

    render()
    {
      const ProductList = this.props.Store.ProductList;
        
      const Products = ProductList.map((Row, i) => {

        const image = {
          backgroundImage: 'url(' + Row.image + ')',
        };

          return(
            <div className="col-lg-12 cart-item no-padding-left-lg no-padding-right-lg" key={i}>
            <div className="white-panel border-panel" id={Row.key}>
              <div className="row">
                <div className="col-lg-3">
                  <div className="img img5x6">
                    <div style={image}></div>
                  </div>
                </div>
                
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-8">
                    <div className="product-category small">{Row.category}</div>
                      <div className="product-caption">
                        <a href="">{Row.name}</a>
                      </div>
                    </div>
                    
                    <div className="col-lg-4 pt15">
                      <form method="post" className="ms2_form" role="form">
                        <div className="form-group">
                          <div className="input-group input-group-sm">
                          <input
                              className="form-control"
                              name="count"
                              typeof="number"
                              name={Row.key}
                              defaultValue={Row.count}
                              onKeyUp={(e) => {
                                  this.changeHadler(e);
                              }}
                              />
                            <span className="input-group-addon">шт.</span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-3 pt15">
                  <div className="catalogGridPrice text-right pb15">
                    <span>{Row.price} р.</span>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-lg-12 text-right">
                    <button 
                      className="clean-button" 
                      name={Row.key}
                      onChange={(e) => {
                          this.getKey(e);
                      }}
                    >
                    <div className="clean-cart">
                      <i className="fa fa-times text-red"></i> <span className="on-page-act">Убрать из корзины</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          )
      });

        return (

        <div className="white-frame p15">
          <div className="row">
            <div className="col-lg-12">
              <p className="h2">В моей корзине</p>
            </div>
          </div>

            <div className="row">
                {Products}
            <div className="row">
              <div className="col-lg-12 pt15 text-right">
                <form className="plr15">
                  <button className="not-button" id="cart-clean" onChange={this.props.cartClean}>
                    <span className="on-page-act">Очистить корзину</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div> 
        )
    }
}