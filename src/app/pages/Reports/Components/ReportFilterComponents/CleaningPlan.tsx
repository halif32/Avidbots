import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useState } from 'react';
import { Icon } from '@rneui/base';
import { CustomCheckBox } from 'components/CheckBox';
import { useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import { reportStyles } from '../../styles';
import { useReportData } from 'contexts/ReportDataContext';
import componentStyles from 'components/componentStyles';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';

export const CleaningPlan = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { cleaningPlans, loading, selectedCleaningPlans, setSelectedCleaningPlans } =
    useReportData();

  const CheckboxList = ({ item, isOpen, onToggleDropdown, onCheckboxPress }) => {
    const isChecked = selectedCleaningPlans.includes(item.locationId);

    const handleMainCheckboxPress = () => {
      // Check if all sub-items are selected
      const allSubItemsSelected =
        item.subItems &&
        item.subItems.length > 0 &&
        item.subItems.every((subItem) => selectedCleaningPlans.includes(subItem.cleaningPlanId));

      // Toggle the state of the main checkbox directly
      onCheckboxPress(item.locationId, !isChecked, item.subItems);

      // If all sub-items are selected, add the main item to the selection
      if (!isChecked && allSubItemsSelected) {
        onCheckboxPress(item.locationId, true, item.subItems);
      } else if (isChecked) {
        onCheckboxPress(item.locationId, false, item.subItems);
        onCheckboxPress(null, false, item.subItems);
      }
    };
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <CustomCheckBox
            title={item.label}
            checked={isChecked}
            onPress={handleMainCheckboxPress}
          />
          {item.subItems && item.subItems.length > 0 && (
            <TouchableOpacity onPress={onToggleDropdown}>
              <Icon
                name={isOpen ? 'up' : 'down'}
                size={24}
                type="ant-design"
                color={theme.colors.reportItemTextColor}
              />
            </TouchableOpacity>
          )}
        </View>
        {isOpen &&
          item.subItems &&
          item.subItems.map((subItem, key) => (
            <View key={key} style={{ marginLeft: 20 }}>
              <CustomCheckBox
                key={subItem.cleaningPlanId}
                title={subItem.label}
                checked={selectedCleaningPlans.includes(subItem.cleaningPlanId)}
                onPress={() =>
                  onCheckboxPress(
                    subItem.cleaningPlanId,
                    !selectedCleaningPlans.includes(subItem.cleaningPlanId)
                  )
                }
              />
            </View>
          ))}
      </View>
    );
  };

  const handleToggleDropdown = (itemId) => {
    setOpenDropdownId((prevId) => (prevId === itemId ? null : itemId));
  };

  const handleCheckboxPress = (itemId, checked, subItems) => {
    setSelectedCleaningPlans((prevselectedCleaningPlans) => {
      let updatedSelection = [];

      if (checked) {
        // Item is checked, add to selection
        updatedSelection = [...prevselectedCleaningPlans, itemId];
        // Handle selection state for nested checkboxes
        if (subItems) {
          const nestedCheckboxIds = subItems.map((subItem) => subItem.cleaningPlanId);
          updatedSelection.push(...nestedCheckboxIds);
        }
      } else {
        // Item is unchecked, remove from selection
        updatedSelection = prevselectedCleaningPlans.filter(
          (id) => !subItems?.map((subItem) => subItem.cleaningPlanId).includes(id) && id !== itemId
        );
      }

      return updatedSelection;
    });
  };

  return (
    <View style={[componentStyles.bottomSheetMainContainer]}>
      <Text style={[globalStyles.marginBottom5, reportStyles.bottomSheetHeader]}>
        {t('Cleaning_Plans')}
      </Text>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={cleaningPlans}
          keyExtractor={(data) => data.locationId}
          onEndReachedThreshold={1.0}
          initialNumToRender={10}
          windowSize={1}
          ListEmptyComponent={
            <Text
              style={[
                { color: theme.colors.textColor },
                globalStyles.paddingHorz10,
                globalStyles.paddinVert10,
                globalStyles.textCenter,
              ]}
            >
              {t('No_Cleaning_Plan')}
            </Text>
          }
          renderItem={({ item }: any) => {
            return (
              <CheckboxList
                key={item.locationId}
                item={item}
                isOpen={openDropdownId === item.locationId}
                onToggleDropdown={() => handleToggleDropdown(item.locationId)}
                onCheckboxPress={handleCheckboxPress}
              />
            );
          }}
        />
      )}
    </View>
  );
};
