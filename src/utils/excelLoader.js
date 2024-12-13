import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';

export const loadExcelFile = async () => {
  try {
    const fileUri = FileSystem.documentDirectory + 'firestations.csv'; // 확장자 변경

    const fileExists = await FileSystem.getInfoAsync(fileUri);
    if (!fileExists.exists) {
      await FileSystem.copyAsync({
        from: require('../../assets/firestation.csv'), // 파일 이름 변경
        to: fileUri,
      });
    }

    const csvData = await FileSystem.readAsStringAsync(fileUri);
    const workbook = XLSX.read(csvData, { type: 'string' });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return sheetData; // JSON 형태로 반환
  } catch (error) {
    console.error('Excel 파일 로드 에러:', error);
    throw error;
  }
};
