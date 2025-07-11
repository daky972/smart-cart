export default class FilterView {
  constructor(productView, filterModel) {
      this.container = document.querySelector('#filters-container');
      this.filterModel = filterModel;
      this.productView = productView;
  }

  renderCategories(categories) {
      const categoriesContainer = document.createElement('div');
      categoriesContainer.className = 'categories-container';


      const label = document.createElement('label');
      label.htmlFor = 'categories-filter';
      label.textContent = 'Category:';
      categoriesContainer.appendChild(label);

      const cate = document.createElement('select');
      cate.id = 'categories-filter';
      cate.addEventListener('change', (e) => {
          this.productView.renderProducts(this.filterModel.filterProducts(e.target.value));
      });

      const allOption = document.createElement('option');
      allOption.textContent = 'All';
      allOption.value = 'all';
      cate.appendChild(allOption);

      categories.forEach(c => {
          const category = c.slice(0, 1).toUpperCase() + c.slice(1);
          const option = document.createElement('option');
          option.textContent = category;
          option.value = c;

          cate.appendChild(option);
      });
      categoriesContainer.appendChild(cate);

      this.container.appendChild(categoriesContainer);

      this.renderSortByPrice();
  }

  renderSortByPrice() {
      const sortByPriceContainer = document.createElement('div');
      sortByPriceContainer.id = 'price-sort-container';

      const label = document.createElement('label');
      label.htmlFor = 'price-sort';
      label.textContent = 'Sort by:';
      sortByPriceContainer.appendChild(label);

      const price = document.createElement('select');
      price.id = 'price-sort';
      price.addEventListener('change', (e) => {
          console.log(e.target.value);
          this.productView.renderProducts(this.filterModel.filterProducts(e.target.value));
      });

      const noneOption = document.createElement('option');
      noneOption.textContent = 'None';
      noneOption.value = 'none';
      price.appendChild(noneOption);

      const lowestPriceOption = document.createElement('option');
      lowestPriceOption.textContent = 'Lowest price';
      lowestPriceOption.value = 'lowest';

      const highestPriceOption = document.createElement('option');
      highestPriceOption.textContent = 'Highest price';
      highestPriceOption.value = 'highest';

      price.append(lowestPriceOption, highestPriceOption);
      sortByPriceContainer.appendChild(price);

      this.container.appendChild(sortByPriceContainer);
  }
}