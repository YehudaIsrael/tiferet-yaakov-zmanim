import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function Upload() {
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      localStorage.setItem('calendar', JSON.stringify(data));
      navigate('/');
    };
    reader.readAsBinaryString(e.target.files[0]);
  };

  return (
    <>
      <label htmlFor="file" className="sr-only">
        Choose a file
      </label>
      <input id="file" type="file" onChange={handleFileChange} />
    </>
  );
}
