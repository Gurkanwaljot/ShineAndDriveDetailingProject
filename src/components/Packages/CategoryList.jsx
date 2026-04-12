import React from "react";

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-list">
      {categories.map((category) => {
        const isSelected = selectedCategory?.id === category.id;
        return (
          <button
            key={category.id}
            className={`category-row ${isSelected ? "category-row--active" : ""}`}
            onClick={() => onSelectCategory(isSelected ? null : category)}
          >
            <div className="category-row__content">
              <span className="category-row__name">{category.name}</span>
              <span className="category-row__desc">{category.description}</span>
            </div>
            <span className="category-row__arrow">
              {isSelected ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryList;
