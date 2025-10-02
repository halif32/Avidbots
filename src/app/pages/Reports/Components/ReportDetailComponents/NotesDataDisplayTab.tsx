import { Text } from '@rneui/themed';
import { reportStyles } from 'pages/Reports/styles';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

interface NotesDataDisplayTabProps {
  notes: { [key: string]: any };
}

export const NotesDataDisplayTab = (props: NotesDataDisplayTabProps) => {
  const { t } = useTranslation();
  const { notes } = props;
  return (
    <View style={reportStyles.noteContainer}>
      {/* Use map directly in JSX to render each note */}
      {notes?.length > 0 ? (
        notes.map((note: string, index: number) => (
          <Text key={index} style={reportStyles.tabListDataText}>
            {note}
          </Text>
        ))
      ) : (
        <Text>{t('No_Notes')}</Text>
      )}
    </View>
  );
};
