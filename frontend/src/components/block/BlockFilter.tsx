import { blockColors, type BlockColors } from "../../constants/colors.ts";

const BlockFilter = () => {
  return (
    <div
        style={{
            backgroundColor: "gray",
            padding: "15px 10px",
        }}
    >
      <h3>Filtrar por cor</h3>
      <div className="color-options">
        {
            Object.entries(blockColors).map(
                ([colorName, colorValue]) => (
                    <button
                        key={colorName}
                        className="color-option"
                        style={{ backgroundColor: colorValue }}
                        aria-label={`Filtrar blocos pela cor ${colorName}`}
                    >
                        {colorName}
                    </button>
                )
            )
        }
      </div>
    </div>
  )
}
export default BlockFilter