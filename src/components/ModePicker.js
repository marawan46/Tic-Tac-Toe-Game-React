function ModePicker({handleSubmit,currentMode}) {


  return (
    <div>
      <form className="mode-picker" onSubmit={handleSubmit}>
        <div className="mode">
          <label>Normal</label>
          <input type="radio" name="mode" value="0" />
        </div>
        <div className="mode">
          <label>Over Write</label>
          <input type="radio" name="mode" value="1" />
        </div>
        <input type="submit" />
      </form>
      <div>
      <p className="white-text">Selected Mode: {currentMode !== null ? (currentMode === '0' ? 'Normal' : 'Over Write') : 'None'}</p>
      </div>
    </div>
  );
}

export default ModePicker;
