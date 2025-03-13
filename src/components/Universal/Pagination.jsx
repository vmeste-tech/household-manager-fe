import PropTypes from "prop-types";
import CustomButton from "../Universal/CustomButton";

// Функция для генерации диапазона кнопок пагинации
const getPaginationRange = (currentPage, totalPages) => {
  const delta = 1; // показываем одну страницу до и после текущей
  const range = [];
  const rangeWithDots = [];
  let l;

  // Если страниц мало, выводим все
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
  } else {
    // Формируем диапазон: всегда первая и последняя, вокруг текущей +- delta
    range.push(1);
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }
    range.push(totalPages);
  }

  // Вставляем многоточия, если разрыв больше 1
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 rounded-md p-2">
      <CustomButton
        text="<"
        variant="outlined"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      />
      {paginationRange.map((item, index) =>
        item === "..." ? (
          <span key={index} className="text-xs font-medium text-gray-500">
            {item}
          </span>
        ) : (
          <CustomButton
            key={index}
            text={String(item)}
            variant={item === currentPage ? "filled" : "outlined"}
            onClick={() => onPageChange(item)}
          />
        )
      )}
      <CustomButton
        text=">"
        variant="outlined"
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      />
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
